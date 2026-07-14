import { AccountList } from '../../components';

export default function DashboardPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <AccountList />
        </div>
    );
}
