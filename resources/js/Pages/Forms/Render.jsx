import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function Render({ auth, form }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({});

    const submitForm = () => {
        post(route("forms.submit", form.slug), {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                reset();
                toast.success("Form submitted successfully!");
            },
        });
    };
    const { flash } = usePage().props;
    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title={form.title} />

            <div className="max-w-3xl mx-auto py-10">

                <h1 className="text-3xl font-bold">

                    {form.title}

                </h1>

                <p className="text-gray-500 mt-2">

                    {form.description}

                </p>

                <hr className="my-8" />

                <h2 className="text-xl font-semibold mb-8">
                    Fill Form
                </h2>



                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitForm();
                    }}
                >

                    {form.fields.map((field) => (

                        <div key={field.id}>

                            <label className="block font-medium mb-2">

                                {field.label}

                                {field.is_required && (
                                    <span className="text-red-500 ml-1">*</span>
                                )}

                            </label>

                            {/* Text / Email / Number / Date */}

                            {["text", "email", "number", "date"].includes(field.type) && (

                                <input
                                    type={field.type}
                                    value={data[field.name] || ""}
                                    onChange={(e) =>
                                        setData(field.name, e.target.value)
                                    }
                                    className="border rounded w-full p-2"
                                />

                            )}

                            {/* Textarea */}

                            {field.type === "textarea" && (

                                <textarea
                                    rows="4"
                                    value={data[field.name] || ""}
                                    onChange={(e) =>
                                        setData(field.name, e.target.value)
                                    }
                                    className="border rounded w-full p-2"
                                />

                            )}

                            {/* Select */}

                            {field.type === "select" && (

                                <select
                                    value={data[field.name] || ""}
                                    onChange={(e) =>
                                        setData(field.name, e.target.value)
                                    }
                                    className="border rounded w-full p-2"
                                >

                                    <option value="">
                                        Select...
                                    </option>

                                    {field.options.map(option => (

                                        <option
                                            key={option.id}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>

                                    ))}

                                </select>

                            )}

                            {/* Radio */}

                            {field.type === "radio" && (

                                <div className="space-y-2">

                                    {field.options.map(option => (

                                        <label
                                            key={option.id}
                                            className="flex items-center gap-2"
                                        >

                                            <input
                                                type="radio"
                                                name={field.name}
                                                value={option.value}
                                                checked={data[field.name] === option.value}
                                                onChange={(e) =>
                                                    setData(field.name, e.target.value)
                                                }
                                            />

                                            {option.label}

                                        </label>

                                    ))}

                                </div>

                            )}

                            {/* Checkbox */}

                            {field.type === "checkbox" && (

                                <div className="space-y-2">

                                    {field.options.map(option => (

                                        <label
                                            key={option.id}
                                            className="flex items-center gap-2"
                                        >

                                            <input
                                                type="checkbox"
                                                checked={(data[field.name] || []).includes(option.value)}
                                                onChange={(e) => {

                                                    const values = data[field.name] || [];

                                                    if (e.target.checked) {

                                                        setData(field.name, [...values, option.value]);

                                                    } else {

                                                        setData(
                                                            field.name,
                                                            values.filter(v => v !== option.value)
                                                        );

                                                    }

                                                }}
                                            />

                                            {option.label}

                                        </label>

                                    ))}

                                </div>

                            )}

                            {/* File */}

                            {field.type === "file" && (

                                <input
                                    type="file"
                                    className="border rounded w-full p-2"
                                    onChange={(e) =>
                                        setData(field.name, e.target.files[0])
                                    }
                                />
                            )}

                        </div>

                    ))}

                    <div className="pt-6">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-6 py-3 rounded"
                        >
                            {processing ? "Submitting..." : "Submit Form"}
                        </button>

                    </div>

                </form>

            </div>

        </AuthenticatedLayout>

    );

}