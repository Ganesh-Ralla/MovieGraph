from .db import driver


def test_connection():
    try:
        driver.verify_connectivity()
        print("✅ CognoDB connection successful!")
    except Exception as e:
        print("❌ CognoDB connection failed!")
        print(e)