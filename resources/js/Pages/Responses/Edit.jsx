import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, form, response }) {

    const initialData = {};

    response.answers.forEach(answer => {
        initialData[answer.field.name] =
            answer.field.type === "checkbox"
                ? JSON.parse(answer.answer || "[]")
                : answer.answer;
    });

    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm(initialData);

    function submit() {

        put(route("responses.update", [form.id, response.id]), {
            forceFormData: true,
        });

    }

    return (

        <AuthenticatedLayout user={auth.user}>

            <Head title="Edit Response" />

            <div className="max-w-3xl mx-auto py-8">

                <h1 className="text-3xl font-bold mb-8">
                    Edit Response
                </h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                    className="space-y-6"
                >

                    {response.answers.map((answer) => {

                        const field = answer.field;

                        return (

                            <div key={field.id}>

                                <label className="block mb-2 font-medium">
                                    {field.label}
                                </label>

                                {["text","email","number","date"].includes(field.type) && (

                                    <input
                                        type={field.type}
                                        value={data[field.name] || ""}
                                        onChange={(e)=>
                                            setData(field.name,e.target.value)
                                        }
                                        className="border rounded w-full p-2"
                                    />

                                )}

                                {field.type==="textarea" && (

                                    <textarea
                                        rows="4"
                                        value={data[field.name]||""}
                                        onChange={(e)=>
                                            setData(field.name,e.target.value)
                                        }
                                        className="border rounded w-full p-2"
                                    />

                                )}

                                {field.type==="select" && (

                                    <select
                                        value={data[field.name]||""}
                                        onChange={(e)=>
                                            setData(field.name,e.target.value)
                                        }
                                        className="border rounded w-full p-2"
                                    >

                                        {field.options.map(option=>(

                                            <option
                                                key={option.id}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>

                                        ))}

                                    </select>

                                )}

                                {field.type==="radio" && (

                                    <div className="space-y-2">

                                        {field.options.map(option=>(

                                            <label
                                                key={option.id}
                                                className="flex gap-2"
                                            >

                                                <input
                                                    type="radio"
                                                    value={option.value}
                                                    checked={data[field.name]===option.value}
                                                    onChange={(e)=>
                                                        setData(field.name,e.target.value)
                                                    }
                                                />

                                                {option.label}

                                            </label>

                                        ))}

                                    </div>

                                )}

                                {field.type==="checkbox" && (

                                    <div className="space-y-2">

                                        {field.options.map(option=>(

                                            <label
                                                key={option.id}
                                                className="flex gap-2"
                                            >

                                                <input
                                                    type="checkbox"
                                                    checked={(data[field.name]||[]).includes(option.value)}
                                                    onChange={(e)=>{

                                                        const values=data[field.name]||[];

                                                        if(e.target.checked){

                                                            setData(field.name,[...values,option.value]);

                                                        }else{

                                                            setData(
                                                                field.name,
                                                                values.filter(v=>v!==option.value)
                                                            );

                                                        }

                                                    }}
                                                />

                                                {option.label}

                                            </label>

                                        ))}

                                    </div>

                                )}

                                {field.type==="file" && (

                                    <input
                                        type="file"
                                        onChange={(e)=>
                                            setData(field.name,e.target.files[0])
                                        }
                                    />

                                )}

                            </div>

                        );

                    })}

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 text-white px-6 py-3 rounded"
                    >
                        Update Response
                    </button>

                </form>

            </div>

        </AuthenticatedLayout>

    );

}