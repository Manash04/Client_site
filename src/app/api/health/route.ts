import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServiceSupabase();
    const { error } = await supabase.from("products").select("id").limit(1);

    if (error) throw error;

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 },
    );
  }
}
