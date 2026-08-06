import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({
    auth,
    form,
    responses,
    previewFields,
}) {

    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title="Responses" />

            <div className="max-w-6xl mx-auto py-8">

                <h1 className="text-3xl font-bold">
                    {form.title}
                </h1>

                <p className="text-gray-500 mt-2">
                    Submitted Responses
                </p>

                <table className="w-full mt-8 border">

                    <thead className="bg-gray-100">
                        <tr>

                            {previewFields.map((field) => (
                                <th
                                    key={field.id}
                                    className="p-3 text-left"
                                >
                                    {field.label}
                                </th>
                            ))}

                            <th className="p-3 text-left">
                                Action
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {responses.data.map((response) => (

                            <tr
                                key={response.id}
                                className="border-t"
                            >

                                {previewFields.map((field) => {

                                    const answer = response.answers.find(
                                        a => a.field_id === field.id
                                    );

                                    return (
                                        <td
                                            key={field.id}
                                            className="p-3"
                                        >
                                            {answer ? answer.answer : "-"}
                                        </td>
                                    );

                                })}

                                <td className="p-3">

                                    <Link
                                        href={route("responses.show", [form.id, response.id])}
                                        className="text-indigo-600 hover:underline"
                                    >
                                        View
                                    </Link>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </AuthenticatedLayout>

    );

}