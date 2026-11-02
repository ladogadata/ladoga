from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="LADOGA_")

    admin_username: str
    admin_password: str
    secret_key: str = Field(min_length=32)
    session_hours: int = 12
    database_url: str = "sqlite:////data/ladoga.db"

settings = Settings()