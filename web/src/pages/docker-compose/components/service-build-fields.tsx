import { FC } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormInput } from '@/components/form/form-input';
import { FormCheckbox } from '@/components/form/form-checkbox';

type ServiceBuildFieldsProps = {
  serviceIndex: number;
};

export const ServiceBuildFields: FC<ServiceBuildFieldsProps> = ({
  serviceIndex,
}) => {
  const { control, watch } = useFormContext();
  const buildEnabled = watch(`services.${serviceIndex}.build.enabled`);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `services.${serviceIndex}.build.args`,
  });

  return (
    <div className="mb-2 mt-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-base font-bold">Build Configuration</p>
        <FormCheckbox
          name={`services.${serviceIndex}.build.enabled`}
          label="Enable Build"
        />
      </div>

      {buildEnabled && (
        <div className="space-y-4 rounded-md border border-gray-200 p-4 dark:border-gray-500">
          <div className="flex [&>div]:flex-1 gap-2">
            <FormInput
              name={`services.${serviceIndex}.build.context`}
              label="Context"
              placeholder="."
            />
            <FormInput
              name={`services.${serviceIndex}.build.dockerfile`}
              label="Dockerfile"
              placeholder="Dockerfile"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <p className="text-sm font-semibold">Build Arguments</p>
              <button
                type="button"
                onClick={() => append({ key: '', value: '' })}
                className="btn btn-xs ml-4"
              >
                Add <Plus className="size-3" />
              </button>
            </div>

            {fields.map((field, idx) => (
              <div key={field.id} className="flex items-center gap-2">
                <div className="flex items-center divide-x divide-gray-200 rounded-md border border-gray-200 dark:divide-gray-500 dark:border-gray-500">
                  <FormInput
                    label=""
                    name={`services.${serviceIndex}.build.args.${idx}.key`}
                    placeholder="Key"
                    className="h-12 w-full rounded-s-md px-2"
                  />
                  <FormInput
                    label=""
                    name={`services.${serviceIndex}.build.args.${idx}.value`}
                    placeholder="Value"
                    className="h-12 w-full rounded-e-md px-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="btn btn-error"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};