import Swal, {SweetAlertOptions} from 'sweetalert2'
export function useError() {
    const getErrorMessage = (error: unknown) => {
        if (error instanceof Error) return error.message
        return String(error)
    }

    const displayError = (error: unknown) => {
        const options: SweetAlertOptions = {
            position: 'top-end',
            icon: 'error',
            title: 'Something wrong!',
            text: getErrorMessage(error),
            showConfirmButton: false,
            timer: 2500,
            backdrop: false
        }

        Swal.fire(options);
    }

    return {displayError};
}