from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import firebase_admin
from firebase_admin import auth, credentials
from app.core.config import settings

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    if settings.GOOGLE_APPLICATION_CREDENTIALS:
        cred = credentials.Certificate(settings.GOOGLE_APPLICATION_CREDENTIALS)
    else:
        # Use default credentials in Cloud Run
        cred = credentials.ApplicationDefault()

    firebase_admin.initialize_app(cred, {
        'projectId': settings.FIREBASE_PROJECT_ID,
    })

security = HTTPBearer()


async def verify_firebase_token(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> dict:
    """
    Verify Firebase ID token and return decoded token
    Use this as a dependency for protected routes
    """
    try:
        token = credentials.credentials
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid authentication credentials: {str(e)}"
        )


async def get_current_user(
    token: dict = Security(verify_firebase_token)
) -> str:
    """
    Extract user ID from verified token
    """
    return token.get("uid")
