import sql from '@/db/db'
import { Student, StudentPayload } from '@/types/student'

export async function GET() {
    const result = await sql.query`SELECT * FROM Students FOR JSON AUTO`
    const students = result.recordset[0] as Student[]
    return students
}

export async function POST(payload: StudentPayload) {
}
