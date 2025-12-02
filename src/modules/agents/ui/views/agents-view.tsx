"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";

export const AgentsView: React.FC = () => {
    const [filters , setFilters] = useAgentsFilters();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    const router = useRouter();

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable columns={columns} data={data.items} 
                onRowClick={(row) => router.push(`/agents/${row.id}`)}
            />
            <DataPagination
                totalPages={data.totalPages}
                page={filters.page}
                onPageChange={(page) => setFilters({ page })}
            />
            {data.items.length === 0 && (
                <EmptyState
                    title="No Agents Found"
                    description="You have not created any agents yet. Get started by creating a new agent."
                />
            )}
        </div>
    );
};

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="Please wait while we load the agents."
        />
    );
}

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="There was an error loading the agents. Please try again."
        />
    );
}


