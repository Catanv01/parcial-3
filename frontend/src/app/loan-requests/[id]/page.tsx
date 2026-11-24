import Link from "next/link";
import { apiFetch } from "../../../lib/api";
import { notFound } from "next/navigation";
import { LoanRequest } from "../../../lib/loan-types";

type ReceiptPageProps = { params: Promise<{ id: string }> };

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { id } = await params;
  const response = await apiFetch(`/print-requests/${id}`);
  if (!response.ok) notFound();
  const request: LoanRequest = await response.json();
  // TODO FRONT-C: leer params y consultar el detalle con apiFetch.
  // TODO FRONT-C: mostrar ID, purpose, days y tool.name de la solicitud recibida.
  void params;

  return (
    <main>
      <h1>Loan receipt</h1>
      <Link href="/loan-requests">Back to requests</Link>
      <section className="panel">
          <dt>ID</dt><dd>{request.id}</dd>
          <dt>Purpose</dt><dd>{request.purpose}</dd>
          <dt>Days</dt><dd>{request.days}</dd>
          <dt>Tool</dt><dd>{request.tool.name}</dd>
      </section>
    </main>
  );
}

