import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ auth, form, response }) {

    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title="View Response" />

            <div className="max-w-4xl mx-auto py-8">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">
                            {form.title}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Submitted Response
                        </p>

                    </div>

                    <Link
                        href={route("responses.index", form.id)}
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Back
                    </Link>

                    <Link
                        href={route("responses.edit", [form.id, response.id])}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => {
                            if (confirm("Delete response?")) {
                                router.delete(
                                    route("responses.destroy", [form.id, response.id])
                                );
                            }
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>

                </div>

                <div className="bg-white rounded-lg shadow">

                    {response.answers.map((answer) => (

                        <div
                            key={answer.id}
                            className="border-b p-6"
                        >

                            <h3 className="font-semibold text-lg">

                                {answer.field.label}

                            </h3>

                            <div className="mt-2 text-gray-700">

                                {/* File */}

                                {answer.field.type === "file" ? (

                                    <a
                                        href={`/storage/${answer.answer}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View File
                                    </a>

                                ) : (

                                    answer.answer

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </AuthenticatedLayout>

    );

}