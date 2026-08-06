import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {

    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title="Dashboard" />

            <div className="p-8">

                <h1 className="text-3xl font-bold">
                    AI Form Builder
                </h1>

                <div className="grid grid-cols-3 gap-6 mt-8">

                    <div className="bg-white rounded shadow p-6">
                        <h2>Total Forms</h2>
                        <p className="text-4xl">
                            {stats.totalForms}
                        </p>
                    </div>

                    <div className="bg-white rounded shadow p-6">
                        <h2>AI Forms</h2>
                        <p className="text-4xl">
                            {stats.aiForms}
                        </p>
                    </div>

                    <div className="bg-white rounded shadow p-6">
                        <h2>Responses</h2>
                        <p className="text-4xl">
                            {stats.responses}
                        </p>
                    </div>

                </div>

            </div>

        </AuthenticatedLayout>

    );

}