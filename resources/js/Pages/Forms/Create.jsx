import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {

    const { data, setData, post, processing, errors } = useForm({

        title: "",

        description: "",

        status: "draft",

    });

    function submit(e) {

        e.preventDefault();

        post(route("forms.store"));

    }

    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title="Create Form" />

            <div className="max-w-5xl mx-auto py-8">

                <h1 className="text-3xl font-bold mb-8">

                    Create Form

                </h1>

                <form
                    onSubmit={submit}
                    className="bg-white rounded-lg shadow p-8"
                >

                    <div className="mb-6">

                        <label className="block mb-2">

                            Title

                        </label>

                        <input
                            className="w-full rounded-lg"
                            value={data.title}
                            onChange={e =>
                                setData("title", e.target.value)
                            }
                        />

                        {errors.title &&
                            <p className="text-red-500 mt-2">

                                {errors.title}

                            </p>
                        }

                    </div>

                    <div className="mb-6">

                        <label className="block mb-2">

                            Description

                        </label>

                        <textarea
                            rows="4"
                            className="w-full rounded-lg"
                            value={data.description}
                            onChange={e =>
                                setData("description", e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-8">

                        <label className="block mb-2">

                            Status

                        </label>

                        <select
                            className="w-full rounded-lg"
                            value={data.status}
                            onChange={e =>
                                setData("status", e.target.value)
                            }
                        >

                            <option value="draft">

                                Draft

                            </option>

                            <option value="published">

                                Published

                            </option>

                        </select>

                    </div>

                    <div className="flex justify-end gap-3">

                        <Link
                            href={route("forms.index")}
                            className="px-5 py-2 rounded bg-gray-200"
                        >

                            Cancel

                        </Link>

                        <button
                            disabled={processing}
                            className="bg-indigo-600 text-white px-6 py-2 rounded"
                        >

                            Save Form

                        </button>

                    </div>

                </form>

            </div>

        </AuthenticatedLayout>

    );

}