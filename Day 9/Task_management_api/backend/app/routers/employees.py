from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Employee, User

from ..schemas import (
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeResponse
)

from ..auth import get_current_user


# =========================================================
# ROUTER
# =========================================================

router = APIRouter(
    prefix="/api/employees",
    tags=["Employees"]
)


# =========================================================
# GET ALL EMPLOYEES + SEARCH
# =========================================================

@router.get(
    "/",
    response_model=list[EmployeeResponse]
)
def get_employees(
    search: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    query = db.query(Employee)

    # Search by name, email, department or role
    if search:

        search_value = f"%{search}%"

        query = query.filter(
            (Employee.name.ilike(search_value)) |
            (Employee.email.ilike(search_value)) |
            (Employee.department.ilike(search_value)) |
            (Employee.role.ilike(search_value))
        )

    return query.order_by(
        Employee.id.desc()
    ).all()


# =========================================================
# GET ONE EMPLOYEE
# =========================================================

@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse
)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    employee = db.get(
        Employee,
        employee_id
    )

    if not employee:

        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


# =========================================================
# CREATE EMPLOYEE
# =========================================================

@router.post(
    "/",
    response_model=EmployeeResponse,
    status_code=201
)
def create_employee(
    data: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Check whether email already exists
    existing_employee = db.query(
        Employee
    ).filter(
        Employee.email == data.email
    ).first()

    if existing_employee:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    # Create employee object
    employee = Employee(
        **data.model_dump()
    )

    # Add to database
    db.add(employee)

    # Save changes
    db.commit()

    # Get generated ID and other database values
    db.refresh(employee)

    return employee


# =========================================================
# UPDATE EMPLOYEE
# =========================================================

@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_employee(
    employee_id: int,
    data: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    employee = db.get(Employee, employee_id)

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(employee, key, value)

    db.commit()
    db.refresh(employee)

    return employee


# =========================================================
# DELETE EMPLOYEE
# =========================================================

@router.delete(
    "/{employee_id}"
)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Find employee
    employee = db.get(
        Employee,
        employee_id
    )

    if not employee:

        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    # Delete employee
    db.delete(employee)

    # Save changes
    db.commit()

    return {
        "message": "Employee deleted successfully"
    }