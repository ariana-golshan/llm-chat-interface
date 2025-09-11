import os, json
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import httpx
from database import init_database, save_chat, save_message, get_chat_messages, get_all_chats

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY not set in .env")

OPENAI_URL = "https://api.openai.com/v1/chat/completions"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_database()


async def ask_openai_stream(
    messages, model="gpt-4o-mini", temperature=0.7, max_tokens=4000
):
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }

    body = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
        "stream": True,
    }

    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream(
            "POST", OPENAI_URL, headers=headers, json=body
        ) as resp:
            async for line in resp.aiter_lines():
                if line.startswith("data: "):
                    data_str = line[6:].strip()
                    if data_str == "[DONE]":
                        break
                    if data_str:
                        try:
                            data_json = json.loads(data_str)
                            chunk = data_json["choices"][0]["delta"].get("content")
                            if chunk:
                                yield chunk
                        except Exception as e:
                            continue


@app.post("/api/chat")
async def chat(payload: dict):
    chat_id = payload.get("chat_id", "default")
    user_message = payload.get("message", "")
    model = payload.get("model", "gpt-4o-mini")
    if not user_message:
        raise HTTPException(status_code=400, detail="Message is required.")

    # Save chat and user message to database
    await save_chat(chat_id)
    await save_message(chat_id, "user", user_message)
    
    # Get conversation history from database
    messages = await get_chat_messages(chat_id)
    
    # Add system message if this is a new chat
    if len(messages) == 1:  # Only user message exists
        system_message = {
            "role": "system",
            "content": """You are a helpful assistant that responds clearly and fully.
            When providing tabular data, always return it in HTML format with <table> ... </table>."""
        }
        messages.insert(0, system_message)

    # Store the assistant's response
    full_response = ""

    async def event_generator():
        nonlocal full_response
        try:
            async for chunk in ask_openai_stream(messages, model=model):
                full_response += chunk
                yield chunk
        except httpx.HTTPStatusError as e:
            yield f"\n[HTTP Error {e.response.status_code}]: {e.response.text}"
        except Exception as e:
            yield f"\n[Other Error]: {str(e)}"

        # Save the complete response to database
        if full_response:
            await save_message(chat_id, "assistant", full_response)

    return StreamingResponse(event_generator(), media_type="text/plain")


@app.get("/api/chats")
async def get_chats():
    """Get all chats with previews"""
    chats = await get_all_chats()
    return {"chats": chats}


@app.get("/api/chats/{chat_id}")
async def get_chat(chat_id: str):
    """Get messages for a specific chat"""
    messages = await get_chat_messages(chat_id)
    # Convert to frontend format
    frontend_messages = []
    for msg in messages:
        if msg["role"] != "system":  # Skip system messages for frontend
            frontend_messages.append({
                "id": len(frontend_messages) + 1,
                "text": msg["content"],
                "sender": "user" if msg["role"] == "user" else "bot"
            })
    return {"messages": frontend_messages}


# import os, json
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import StreamingResponse
# from dotenv import load_dotenv
# import httpx

# load_dotenv()

# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# if not OPENAI_API_KEY:
#     raise RuntimeError("OPENAI_API_KEY not set in .env")

# OPENAI_URL = "https://api.openai.com/v1/chat/completions"

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# conversations = {}


# @app.post("/api/chat")
# async def chat(payload: dict):
#     chat_id = payload.get("chat_id", "default")
#     user_message = payload.get("message", "")
#     model = payload.get('model', 'gpt-4o-mini')
#     if not user_message:
#         raise HTTPException(status_code=400, detail="Message is required.")

#     if chat_id not in conversations:
#         conversations[chat_id] = [
#             # {
#             #     "role": "system",
#             #     "content": """You are a friendly and knowledgeable assistant who explains concepts clearly with examples.
#             #     When providing tabular data, always return it in HTML format with <table> ... </table>.
#             #     """,
#             # }
#             {
#                 "role": "user",
#                 "content": """Write a detailed article of **exactly 2500 words** on digital painting.
#                 The article must be structured into:
#                 - Introduction (~300 words)
#                 - History (~500 words)
#                 - Techniques (~600 words)
#                 - Tools and Software (~600 words)
#                 - Future Trends (~500 words)
#                 Use formal, clear language."""
#             }

#         ]

#     conversations[chat_id].append({"role": "user", "content": user_message})

#     headers = {
#         "Authorization": f"Bearer {OPENAI_API_KEY}",
#         "Content-Type": "application/json",
#     }

#     body = {
#         "model": model,
#         "messages": conversations[chat_id],
#         "max_tokens": 4000,
#         "temperature": 0.7,
#     }

#     try:
#         async with httpx.AsyncClient(timeout=30.0) as client:
#             resp = await client.post(OPENAI_URL, headers=headers, json=body)
#             resp.raise_for_status()
#             data = resp.json()
#             print("OpenAI Response:", data)

#             reply = data["choices"][0]["message"]["content"]
#             conversations[chat_id].append({"role": "assistant", "content": reply})

#             return {"reply": reply}

#     except httpx.HTTPStatusError as e:
#         print("HTTPStatusError:", e.response.text)
#         raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
#     except Exception as e:
#         print("Other Error:", str(e))
#         raise HTTPException(status_code=500, detail=str(e))


# headers = {
#     "Authorization": f"Bearer {OPENAI_API_KEY}",
#     "Content-Type": "application/json",
# }
# body = {
#     # "model": "openai/gpt-oss-20b:free",
#     "model": "tngtech/deepseek-r1t2-chimera:free",
#     "messages": [
#         {
#             "role": "system",
#             "content": "You are a helpful assistant.",
#         },
#         {"role": "user", "content": user_message},
#     ],
# }

# try:
#     async with httpx.AsyncClient() as client:
#         resp = await client.post(OPENROUTER_URL, headers=headers, json=body)
#         resp.raise_for_status()
#         data = resp.json()
#         print(data)
#         reply = data["choices"][0]["message"]["content"]
#         return {"reply": reply}

# except httpx.HTTPStatusError as e:
#     raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
# except Exception as e:
#     raise HTTPException(status_code=500, detail=str(e))


# OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# @app.post("/api/chat")
# async def chat(request: Request):
#     data = await request.json()
#     user_message = data.get("message")

#     async def event_stream():
#         async with httpx.AsyncClient(timeout=None) as client:
#             async with client.stream(
#                 "POST",
#                 OPENROUTER_URL,
#                 headers={
#                     "Authorization": f"Bearer {OPENROUTER_API_KEY}",
#                     "Content-Type": "application/json",
#                 },
#                 json={
#                     "model": "tngtech/deepseek-r1t2-chimera:free",
#                     "stream": True,
#                     "messages": [
#                         {
#                             "role": "system",
#                             "content": "You are a helpful assistant.",
#                         },
#                         {"role": "user", "content": user_message},
#                     ],
#                 },
#             ) as response:
#                 async for chunk in response.aiter_text():
#                     yield chunk

#     return StreamingResponse(event_stream(), media_type="text/event-stream")
