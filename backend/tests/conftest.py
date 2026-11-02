import os

os.environ.update({
    "LADOGA_ADMIN_USERNAME": "admin",
    "LADOGA_ADMIN_PASSWORD": "secret",
    "LADOGA_SECRET_KEY": "test-secret-key-at-least-32-bytes-long",
    "LADOGA_DATABASE_URL": "sqlite://",
})