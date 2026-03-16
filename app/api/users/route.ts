import db from "../../../lib/db";
import bcrypt from "bcrypt";

export async function GET() {
  const [rows] = await db.execute(
    "SELECT id,name,email,phone,date_of_birth,address,about_me,created_at FROM users",
  );
  return Response.json(rows);
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password, phone, date_of_birth, address, about_me } =
      body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // convert empty date to null
    const dob = date_of_birth || null;

    await db.execute(
      "INSERT INTO users (name,email,password,phone,date_of_birth,address,about_me) VALUES (?,?,?,?,?,?,?)",
      [name, email, hashedPassword, phone, dob, address, about_me],
    );

    return Response.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong while saving user" },
      { status: 500 },
    );
  }
}
