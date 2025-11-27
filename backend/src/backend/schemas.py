from pydantic import BaseModel, EmailStr, conint

class EmailBase(BaseModel):
    email: EmailStr

class EmailCreate(EmailBase):
    pass

class Email(EmailBase):
    id: int

    class Config:
        from_attributes = True

class UserInfoBase(BaseModel):
    username: str
    email: EmailStr
    number: conint(le=10)
    service: str
    subject: str
    message: str

class UserInfoCreate(UserInfoBase):
    pass

class UserInfo(UserInfoBase):
    id: int

    class Config:
        from_attributes = True