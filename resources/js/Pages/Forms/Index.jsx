import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
export default function Index({ auth, forms, filters }) {

    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        router.get(route("forms.index"), {
            search: value,
        }, {
            preserveState: true,
            replace: true,
        });

    };

    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title="Forms" />

            <div className="max-w-7xl mx-auto py-8">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-3xl font-bold">
                        Forms
                    </h1>

                    <Link
                        href={route("forms.create")}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        + Create Form
                    </Link>

                </div>

                <div className="mb-6">

                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search forms..."
                        className="w-full rounded-lg border-gray-300"
                    />

                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">

                    <table className="min-w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="px-4 py-3 text-left">
                                    Title
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left">
                                    AI
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Created
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {forms.data.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-8"
                                    >
                                        No forms found.
                                    </td>

                                </tr>

                            )}

                            {forms.data.map((form) => (

                                <tr
                                    key={form.id}
                                    className="border-t"
                                >

                                    <td className="px-4 py-4">

                                        <div className="font-semibold">
                                            {form.title}
                                        </div>

                                        <div className="text-gray-500 text-sm">
                                            {form.description}
                                        </div>

                                    </td>

                                    <td className="px-4 py-4">

                                        <span className={`px-3 py-1 rounded-full text-sm
                                            ${form.status === "published"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {form.status}
                                        </span>

                                    </td>

                                    <td className="px-4 py-4">

                                        {form.is_ai_generated ? "🤖 Yes" : "Manual"}

                                    </td>

                                    <td className="px-4 py-4">

                                        {new Date(form.created_at).toLocaleDateString()}

                                    </td>

                                    <td className="px-4 py-4 text-center space-x-2">

                                        <Link
                                            href={route("forms.builder", form.id)}
                                            className="text-indigo-600"
                                        >
                                            Builder
                                        </Link>

                                        <Link
                                            href={route("responses.index", form.id)}
                                            className="text-green-600 hover:underline"
                                        >
                                            Responses
                                        </Link>

                                        <button
                                            onClick={() => {
                                                if (!confirm("Are you sure you want to delete this form?")) {
                                                    return;
                                                }

                                                router.delete(route("forms.destroy", form.id), {
                                                    onSuccess: () => {
                                                        toast.success("Form deleted successfully.");
                                                    },
                                                    onError: () => {
                                                        toast.error("Failed to delete form.");
                                                    },
                                                });
                                            }}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </AuthenticatedLayout>

    );

}