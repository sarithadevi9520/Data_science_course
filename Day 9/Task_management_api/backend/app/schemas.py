from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, EmailStr


# =========================
# TASK MANAGEMENT SCHEMAS
# =========================

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    completed: bool = False


class TaskUpdate(BaseModel):
    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    completed: bool


class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    completed: bool
    created_at: datetime


# =========================
# USER AUTHENTICATION SCHEMAS
# =========================

class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str


class Token(BaseModel):
    access_token: str
    token_type: str


# =========================
# EMPLOYEE MANAGEMENT SCHEMAS
# =========================

class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    department: str
    role: str
    salary: float
    phone: str | None = None
    status: str = "Active"


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    id: int

    model_config = ConfigDict(from_attributes=True)