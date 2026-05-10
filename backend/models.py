class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category = Column(String)
    content = Column(Text)
    image = Column(String)