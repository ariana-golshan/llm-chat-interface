import aiosqlite
import json
from datetime import datetime

DATABASE_PATH = "chatgpt.db"

async def init_database():
    """Initialize the database with required tables"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        # Create chats table
        await db.execute("""
            CREATE TABLE IF NOT EXISTS chats (
                id TEXT PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create messages table
        await db.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                chat_id TEXT,
                role TEXT,
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (chat_id) REFERENCES chats (id)
            )
        """)
        
        await db.commit()

async def save_chat(chat_id: str):
    """Create a new chat if it doesn't exist"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute(
            "INSERT OR IGNORE INTO chats (id) VALUES (?)",
            (chat_id,)
        )
        await db.commit()

async def save_message(chat_id: str, role: str, content: str):
    """Save a message to the database"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute(
            "INSERT INTO messages (chat_id, role, content) VALUES (?, ?, ?)",
            (chat_id, role, content)
        )
        await db.execute(
            "UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (chat_id,)
        )
        await db.commit()

async def get_chat_messages(chat_id: str):
    """Get all messages for a chat"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute(
            "SELECT role, content FROM messages WHERE chat_id = ? ORDER BY created_at",
            (chat_id,)
        )
        rows = await cursor.fetchall()
        return [{"role": row[0], "content": row[1]} for row in rows]

async def get_all_chats():
    """Get all chats with their first message"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("""
            SELECT c.id, c.updated_at, m.content
            FROM chats c
            LEFT JOIN messages m ON c.id = m.chat_id AND m.role = 'user'
            GROUP BY c.id
            ORDER BY c.updated_at DESC
        """)
        rows = await cursor.fetchall()
        return [{"id": row[0], "updated_at": row[1], "preview": row[2] or "New Chat"} for row in rows]