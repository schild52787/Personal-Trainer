from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables
    """
    # API Configuration
    API_VERSION: str = "v1"
    ENVIRONMENT: str = "development"

    # Firebase
    FIREBASE_PROJECT_ID: str
    GOOGLE_APPLICATION_CREDENTIALS: str = ""

    # Security
    SECRET_KEY: str = "changeme"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173"]

    # GCP
    GCP_PROJECT_ID: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
