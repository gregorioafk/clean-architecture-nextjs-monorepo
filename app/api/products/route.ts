/**
 * CAPA: EXTERNAL - FRAMEWORK (Next.js Routes)
 *
 * Este archivo es parte de la capa EXTERNAL porque:
 * - Depende directamente de Next.js (framework específico)
 * - Solo traduce entre Next.js y el Controller
 *
 * El Controller (Adapter) ya maneja la lógica de HTTP.
 * Aquí solo convertimos NextRequest/NextResponse.
 */

import { NextRequest, NextResponse } from 'next/server';
import { productController } from '../../../backend/infrastructure/dependencies';

// GET /api/products
export async function GET() {
  const result = await productController.getAll();
  return NextResponse.json(result.body, { status: result.status });
}

// POST /api/products
export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await productController.create(body);
  return NextResponse.json(result.body, { status: result.status });
}
