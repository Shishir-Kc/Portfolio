import os
from supabase import acreate_client, AClient
from dotenv import load_dotenv
load_dotenv()

# TODO: Replace with your Supabase URL and Key
SUPABASE_URL = os.environ.get("SUPABASE_URL", "YOUR_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "YOUR_SUPABASE_KEY")

async def get_supabase() -> AClient:
    """
    Dependency to get a Supabase client.
    """
    return await acreate_client(SUPABASE_URL, SUPABASE_KEY)