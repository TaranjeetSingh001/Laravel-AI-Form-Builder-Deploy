import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Generate({ auth }) {

    const { data, setData, post, processing } = useForm({

        prompt: ""

    });

    function submit(e) {

        e.preventDefault();

        post(route("ai.generate"));

    }

    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title="AI Generator" />

            <div className="max-w-5xl mx-auto py-10">

                <h1 className="text-3xl font-bold mb-8">

                    AI Form Generator

                </h1>

                <div className="bg-white shadow rounded-lg p-8">

                    <form onSubmit={submit}>

                        <label className="block font-semibold mb-3">

                            Describe your form

                        </label>

                        <textarea

                            rows="10"

                            className="w-full rounded-lg"

                            placeholder="Example:

Create an Employee Registration Form.

Collect

Name

Email

Phone

Department

Resume

Joining Date"

                            value={data.prompt}

                            onChange={(e)=>setData('prompt',e.target.value)}

                        />

                        <button

                            disabled={processing}

                            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg"

                        >

                            Generate Form

                        </button>

                    </form>

                </div>

            </div>

        </AuthenticatedLayout>

    );

}