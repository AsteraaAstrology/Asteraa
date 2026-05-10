from pydantic import BaseModel

# =====================================================
# BLOG SCHEMA
# =====================================================

class BlogCreate(BaseModel):

    title: str
    category: str
    content: str

# =====================================================
# HOROSCOPE SCHEMA
# =====================================================

class HoroscopeCreate(BaseModel):

    zodiac: str
    horoscope: str