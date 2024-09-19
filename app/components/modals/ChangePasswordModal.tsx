'use client';

import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import toast from 'react-hot-toast';
import useChangePasswordModal from '@/app/hooks/useChangePasswordModal';

const ChangePasswordModal = () => {
    const changePasswordModal = useChangePasswordModal();
    const { name } = changePasswordModal;
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (data.newPassword !== data.confirmNewPassword) {
            toast.error('Confirmed password is wrong')
        }

        else {
            setIsLoading(true);

            const response = await axios.post('/api/updatePassword', data)
            if(response.data.success){
                toast.success(response.data.message);
                changePasswordModal.onClose();
                reset();
            } else {
                toast.error(response.data.message);
            }
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                // title="Welcome back"
                title={`Hello, ${name}`}
                subtitle="Change your password!"
            />
            <Input
                id="oldPassword"
                label="Old password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="newPassword"
                type="password"
                label="New password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="confirmNewPassword"
                type="password"
                label="Confirm new password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={changePasswordModal.isOpen}
            title="Change password"
            actionLabel="Update password"
            onClose={changePasswordModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
     );
}
 
export default ChangePasswordModal;