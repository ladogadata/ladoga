from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="LADOGA_")

    admin_username: str
    admin_password: str
    secret_key: str
    session_hours: int = 12


settings = Settings()