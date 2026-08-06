import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Index({ auth }) {

    const { data, setData, post, processing } = useForm({
        file: null,
    });

    function submit(e) {
        e.preventDefault();

        post(route("imports.store"), {
            forceFormData: true,
        });
    }

    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title="Import Form" />

            <div className="max-w-2xl mx-auto py-10">

                <h1 className="text-3xl font-bold mb-6">

                    Import Form

                </h1>

                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded shadow"
                >

                    <input
                        type="file"
                        accept=".csv,.docx"
                        onChange={(e)=>
                            setData("file",e.target.files[0])
                        }
                    />

                    <button
                        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"
                    >
                        {processing ? "Importing..." : "Import"}
                    </button>

                </form>

            </div>

        </AuthenticatedLayout>

    );
}