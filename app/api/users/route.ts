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

    const dob = date_of_birth || null;

    // check if email already exists
    const [existing]: any = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    if (existing.length > 0) {
      return Response.json(
        { error: "Email already registered" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO users (name,email,password,phone,date_of_birth,address,about_me)
       VALUES (?,?,?,?,?,?,?)`,
      [
        name,
        email,
        hashedPassword,
        phone,
        dob || null,
        address || null,
        about_me || null,
      ],
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
