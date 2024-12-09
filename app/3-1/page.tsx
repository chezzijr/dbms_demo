/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Student, StudentPayload } from '@/types/student';


export default function StudentPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
    const [studentDialog, setStudentDialog] = useState(false);
    const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
    const [deleteStudentsDialog, setDeleteStudentsDialog] = useState(false);
    const [student, setStudent] = useState<StudentPayload>();
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [deleteStudentName, setDeleteStudentName] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        fetch('/api/3-1/student')
    }, []);

    const openNew = () => {
        setStudent({
            Email: '',
            Password: '',
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            Address: '',
            AccountBalance: 0
        });
        setSubmitted(false);
        setStudentDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setStudentDialog(false);
    }

    const hideDeleteStudentDialog = () => {
        setDeleteStudentDialog(false);
    }

    const hideDeleteStudentsDialog = () => {
        setDeleteStudentsDialog(false);
    }

    const saveStudent = () => {
        setSubmitted(true);

        // if (student?.Email.trim()) {
        //     let _students = [...students];
        //     let _student = { ...student };
        //     if (student.StudentID) {
        //         const index = findIndexById(student.StudentID);

        //         _students[index] = _student;
        //         toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Student Updated', life: 3000 });
        //     }
        //     else {
        //         _student.StudentID = createId();
        //         _students.push(_student);
        //         toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Student Created', life: 3000 });
        //     }

        //     setStudents(_students);
        //     setStudentDialog(false);
        //     setStudent({});
        // }
    }

    const editStudent = (student: Student) => {
        setStudent({ ...student });
        setStudentDialog(true);
    }

    const confirmDeleteStudent = (student: Student) => {
        setDeleteStudentName(`${student.FirstName} ${student.LastName}`);
        setStudent(student);
        setDeleteStudentDialog(true);
    }

    const deleteStudent = () => {
        // let _students = students.filter(val => val.StudentID !== student.StudentID);
        // setStudents(_students);
        // setDeleteStudentDialog(false);
        // setStudent({});
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Student Deleted', life: 3000 });
    }

    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < students.length; i++) {
            if (students[i].StudentID === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const confirmDeleteSelected = () => {
        setDeleteStudentsDialog(true);
    }

    const deleteSelectedStudents = () => {
        let _students = students.filter(val => !selectedStudents.includes(val));
        setStudents(_students);
        setDeleteStudentsDialog(false);
        setSelectedStudents([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Students Deleted', life: 3000 });
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudent(prevState => ({ ...prevState, [name]: value }));
    }

    const onInputNumberChange = (e: InputNumberValueChangeEvent) => {
        const { name, value } = e.target;
        setStudent(prevState => ({ ...prevState, [name]: value }));
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedStudents.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData: Student) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editStudent(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteStudent(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Students</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const studentDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveStudent} />
        </React.Fragment>
    );

    const deleteStudentDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteStudentDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteStudent} />
        </React.Fragment>
    );

    const deleteStudentsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteStudentsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedStudents} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <div className="card">
                <Toast ref={toast} />

                <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={students} selection={selectedStudents} onSelectionChange={(e) => setSelectedStudents(e.value)}
                    dataKey="StudentID" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" globalFilter={globalFilter} emptyMessage="No students found."
                    header={header}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="StudentID" header="StudentID" sortable></Column>
                    <Column field="Email" header="Email" sortable></Column>
                    <Column field="Password" header="Password" sortable></Column>
                    <Column field="FirstName" header="FirstName" sortable></Column>
                    <Column field="LastName" header="LastName" sortable></Column>
                    <Column field="PhoneNumber" header="PhoneNumber" sortable></Column>
                    <Column field="Address" header="Address" sortable></Column>
                    <Column field="AccountBalance" header="AccountBalance" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={studentDialog} style={{ width: '450px' }} header="Student Details" modal className="p-fluid" footer={studentDialogFooter} onHide={hideDialog}>
                {student && (
                    <div className="p-field">
                        <label htmlFor="Email">Email</label>
                        <InputText id="Email" name="Email" value={student.Email} onChange={onInputChange} required autoFocus className={classNames({ 'p-invalid': submitted && !student.Email })} />
                        {submitted && !student.Email && <small className="p-error">Email is required.</small>}
                    </div>
                )}
                {student && (
                    <div className="p-field">
                        <label htmlFor="Password">Password</label>
                        <InputText id="Password" name="Password" value={student.Password} onChange={onInputChange} required className={classNames({ 'p-invalid': submitted && !student.Password })} />
                        {submitted && !student.Password && <small className="p-error">Password is required.</small>}
                    </div>
                )}
                {student && (
                    <div className="p-field">
                        <label htmlFor="FirstName">FirstName</label>
                        <InputText id="FirstName" name="FirstName" value={student.FirstName} onChange={onInputChange} required className={classNames({ 'p-invalid': submitted && !student.FirstName })} />
                        {submitted && !student.FirstName && <small className="p-error">FirstName is required.</small>}
                    </div>
                )}
                {student && (
                    <div className="p-field">
                        <label htmlFor="LastName">LastName</label>
                        <InputText id="LastName" name="LastName" value={student.LastName} onChange={onInputChange} required className={classNames({ 'p-invalid': submitted && !student.LastName })} />
                        {submitted && !student.LastName && <small className="p-error">LastName is required.</small>}
                    </div>
                )}
                {student && (
                    <div className="p-field">
                        <label htmlFor="PhoneNumber">PhoneNumber</label>
                        <InputText id="PhoneNumber" name="PhoneNumber" value={student.PhoneNumber} onChange={onInputChange} required className={classNames({ 'p-invalid': submitted && !student.PhoneNumber })} />
                        {submitted && !student.PhoneNumber && <small className="p-error">PhoneNumber is required.</small>}
                    </div>
                )}
                {student && (
                    <div className="p-field">
                        <label htmlFor="Address">Address</label>
                        <InputTextarea id="Address" name="Address" value={student.Address} onChange={onInputChange} required className={classNames({ 'p-invalid': submitted && !student.Address })} />
                        {submitted && !student.Address && <small className="p-error">Address is required.</small>}
                    </div>
                )}
                {student && (
                    <div className="p-field">
                        <label htmlFor="AccountBalance">AccountBalance</label>
                        <InputNumber id="AccountBalance" name="AccountBalance" value={student.AccountBalance} onValueChange={onInputNumberChange} mode="decimal" minFractionDigits={2} />
                    </div>
                )}
            </Dialog>

            <Dialog visible={deleteStudentDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteStudentDialogFooter} onHide={hideDeleteStudentDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {student && <span>Are you sure you want to delete <b>{deleteStudentName}</b>?</span>}
                </div>
            </Dialog>
        </div>
    )
}
