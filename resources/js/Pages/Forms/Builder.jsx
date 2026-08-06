import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";


export default function Builder({ auth, form }) {

    const [showModal, setShowModal] = useState(false);
    const [editingField, setEditingField] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        label: "",
        type: "text",
        required: false,
    });

    const saveField = () => {

        if (editingField) {

            put(
                route("forms.fields.update", [form.id, editingField.id]),
                {
                    preserveScroll: true,

                    onSuccess: () => {
                        setEditingField(null);
                        reset();
                        setShowModal(false);
                    },
                }
            );

        } else {

            post(route("forms.fields.store", form.id), {

                preserveScroll: true,

                onSuccess: () => {
                    reset();
                    setShowModal(false);
                },
            });

        }

    };

    const deleteField = (field) => {

        if (!confirm("Delete this field?")) return;

        destroy(
            route("forms.fields.destroy", [form.id, field.id]),
            {
                preserveScroll: true,
            }
        );

    };

    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title="Form Builder" />

            <div className="max-w-6xl mx-auto py-8">

                <h1 className="text-3xl font-bold">

                    {form.title}

                </h1>

                <p className="text-gray-500 mt-2">

                    {form.description}

                </p>

                <hr className="my-8" />

                <h2 className="text-xl font-semibold">

                    Fields

                </h2>

                <button
                    onClick={() => {

                        setEditingField(null);

                        reset();

                        setData({
                            label: "",
                            type: "text",
                            required: false,
                        });

                        setShowModal(true);

                    }}
                    className="mt-5 bg-indigo-600 text-white px-5 py-2 rounded"
                >
                    <span className="text-xl font-bold mb-5">
                        {editingField ? "Edit Field" : "Add Field"}
                    </span>
                </button>
                <button
                    className="ml-3 bg-green-600 text-white px-5 py-2 rounded"
                >
                    <Link
                        href={route("forms.render", form.slug)}
                        className="bg-green-600 text-white px-5 py-2 rounded"
                    >
                        <span className="text-xl font-bold mb-5">Preview Form</span>
                    </Link>

                </button>

                {
                    showModal && (

                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                            <div className="bg-white p-6 rounded-lg w-[450px]">

                                <h2 className="text-xl font-bold mb-5">

                                    Add Field

                                </h2>

                                <div className="space-y-4">

                                    <div>

                                        <label className="block mb-1 font-medium">
                                            Label
                                        </label>

                                        <input
                                            value={data.label}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    label: e.target.value
                                                })
                                            }
                                            className="border rounded w-full p-2"
                                        />

                                    </div>

                                    <div>

                                        <label className="block mb-1 font-medium">
                                            Type
                                        </label>

                                        <select
                                            value={data.type}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    type: e.target.value
                                                })
                                            }
                                            className="border rounded w-full p-2"
                                        >

                                            <option value="text">Text</option>
                                            <option value="email">Email</option>
                                            <option value="number">Number</option>
                                            <option value="textarea">Textarea</option>
                                            <option value="date">Date</option>
                                            <option value="select">Select</option>
                                            <option value="radio">Radio</option>
                                            <option value="checkbox">Checkbox</option>
                                            <option value="file">File</option>

                                        </select>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <input
                                            type="checkbox"
                                            checked={data.required}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    required: e.target.checked
                                                })
                                            }
                                        />

                                        <span>Required</span>

                                    </div>

                                </div>

                                <div className="mt-6 flex justify-end gap-3">

                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={saveField}
                                        disabled={processing}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded"
                                    >
                                        {processing ? "Saving..." : "Save"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}
            </div>

            <div className="mt-6 space-y-4">

                {form.fields.length === 0 && (
                    <div className="text-gray-500">
                        No fields added yet.
                    </div>
                )}

                {form.fields.map((field) => (

                    <div
                        key={field.id}
                        className="border rounded-lg p-4 bg-white shadow-sm"
                    >

                        <div className="flex justify-between">

                            <div>

                                <h3 className="font-semibold">

                                    {field.label}

                                </h3>

                                <p className="text-gray-500 text-sm">

                                    Type: {field.type}

                                </p>

                            </div>

                            <div className="flex items-center gap-4">

                                {field.is_required && (

                                    <span className="text-red-500">
                                        Required
                                    </span>

                                )}

                                <button
                                    onClick={() => {

                                        setEditingField(field);

                                        setData({
                                            label: field.label,
                                            type: field.type,
                                            required: field.is_required,
                                        });

                                        setShowModal(true);

                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteField(field)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                        {field.options.length > 0 && (

                            <div className="mt-3">

                                <p className="font-medium">

                                    Options

                                </p>

                                <ul className="list-disc list-inside">

                                    {field.options.map(option => (

                                        <li key={option.id}>

                                            {option.label}

                                        </li>

                                    ))}

                                </ul>

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </AuthenticatedLayout>

    );

}