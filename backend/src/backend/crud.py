from supabase import AClient
from . import schemas

async def get_email_by_email(supabase: AClient, email: str):
    response = await supabase.table("emails").select("*").eq("email", email).execute()
    if response.data:
        return schemas.Email(**response.data[0])
    return None

async def create_email(supabase: AClient, email: schemas.EmailCreate):
    response = await supabase.table("emails").insert({"email": email.email}).execute()
    return schemas.Email(**response.data[0])

async def create_user_info(supabase: AClient, user_info: schemas.UserInfoCreate):
    response = await supabase.table("user_info").insert(user_info.dict()).execute()
    return schemas.UserInfo(**response.data[0])

async def get_emails(supabase: AClient):
    response = await supabase.table("emails").select("*").execute()
    return [schemas.Email(**email) for email in response.data]

async def get_all_user_info(supabase: AClient):
    response = await supabase.table("user_info").select("*").execute()
    return [schemas.UserInfo(**info) for info in response.data]