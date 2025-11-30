/**
 * CAPA: EXTERNAL - FRAMEWORK (Next.js Routes)
 *
 * Rutas para operaciones sobre un producto específico.
 * Solo traduce entre Next.js y el Controller.
 */

import { NextRequest, NextResponse } from 'next/server';
import { productController } from '../../../../backend/infrastructure/dependencies';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/products/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const result = await productController.getById(id);
  return NextResponse.json(result.body, { status: result.status });
}

// PUT /api/products/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const result = await productController.update(id, body);
  return NextResponse.json(result.body, { status: result.status });
}

// DELETE /api/products/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const result = await productController.remove(id);
  return NextResponse.json(result.body, { status: result.status });
}
