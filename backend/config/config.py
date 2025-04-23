from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str = "HS256"

    api_token: str
    sender_id: str 

    class Config:
        env_file = ".env"  # Tell pydantic to load from .env
        env_file_encoding = "utf-8"

settings = Settings()