from pydantic import BaseModel, Field, field_validator


class AuthBase(BaseModel):
    email: str = Field(min_length=5, max_length=320)
    password: str = Field(min_length=6, max_length=128)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        email = value.strip().lower()
        if "@" not in email or "." not in email.split("@")[-1]:
            raise ValueError("Enter a valid email address")
        return email


class RegisterRequest(AuthBase):
    pass


class LoginRequest(AuthBase):
    pass
