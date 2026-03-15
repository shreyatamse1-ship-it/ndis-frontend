import db from "../../../lib/db";

export async function GET() {
  const [rows] = await db.execute(
    "SELECT id,name,email,phone,date_of_birth,address,about_me,created_at FROM users",
  );
  return Response.json(rows);
}
