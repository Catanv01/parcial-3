import Link from "next/link";
import { apiFetch } from "../../lib/api";
import type { LoanRequest, Tool } from "../../lib/loan-types";

type LoanRequestsPageProps = { searchParams: Promise<{ toolId?: string }> };

export default async function LoanRequestsPage({ searchParams }: LoanRequestsPageProps) {
  const toolsResponse = await apiFetch("/tools");
  const tools: Tool[] = toolsResponse.ok ? await toolsResponse.json() : [];
  const { toolId } = await searchParams;
  const endpoint = toolId
    ? `/loan-requests?toolId=${toolId}`
    : "/loan-requests";

  const response = await apiFetch(endpoint);
  const requests: LoanRequest[] = response.ok ? await response.json() : [];

  return (
    <main>
      <h1>Loan requests</h1>
      <Link className="button" href="/loan-requests/new">New request</Link>

      <form method="GET">
        <label htmlFor="toolId">Tool</label>
        <select id="toolId" name="toolId" defaultValue={toolId ?? ""}>
          <option value="">All tools</option>
          {tools.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.name}
            </option>
          ))}
        </select>
        <button type="submit">Filter</button>
      </form>

      <section className="panel" aria-label="Loan requests">
        {requests.length === 0 ? (
          <p>No hay solicitudes.</p>
        ) : (
          <ul>
            {requests.map((request) => (
              <li key={request.id}>
                <Link href={`/loan-requests/${request.id}`}>{request.purpose}</Link>
                {" - "}{request.days} days — {request.tool.name} — name {request.tool.maxLoanDays} maxloandays
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
