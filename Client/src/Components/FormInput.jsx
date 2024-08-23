
import PropTypes from 'prop-types'

const FormInput = ({ field, name, value }) => {
    return (
        <div className="my-2 w-full md:w-[45%] ">
            <p>{field}<span className="text-red-500">*</span></p>
            <label htmlFor={name}>
                <input type="text"
                    name={name}
                    id={name}
                    // value={value}
                    className="my-2 w-[96%]  rounded-lg border border-black bg-inherit p-1 px-2 shadow-amber-50 outline-none md:w-full" />
            </label>
        </div>
    )
}


FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string
}

export default FormInput