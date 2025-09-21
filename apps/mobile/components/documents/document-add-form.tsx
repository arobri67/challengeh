import { Alert, View } from 'react-native';
import { Input } from '../ui/input';
import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { useCreateDocument } from '@/hooks/use-create-doc';
import { CreateDocumentFormData, createDocumentSchema } from '@/schema/document-schema';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  onSuccess?: () => void;
}

export default function DocumentAddForm({ onSuccess }: Props) {
  const createDocumentMutation = useCreateDocument();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<CreateDocumentFormData>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      name: '',
      version: '',
      file: null,
    },
    mode: 'onChange',
  });

  const selectedFile = watch('file');

  const pickFile = async () => {
    setValue(
      'file',
      {
        uri: 'file://mock-uri', // Dummy URI
        name: 'MockFile.pdf',
        type: 'application/pdf',
      },
      { shouldValidate: true }
    );
    return;
    // try {
    //   const result = await DocumentPicker.getDocumentAsync({
    //     type: '*/*',
    //   });

    //   if (!result.canceled) {
    //     setValue(
    //       'file',
    //       {
    //         uri: 'file://mock-uri',
    //         name: 'MockFile.pdf',
    //         type: 'application/pdf',
    //       },
    //       { shouldValidate: true }
    //     );
    //   }
    // } catch (error) {
    //   Alert.alert('Error', 'Failed to pick file');
    // }
  };
  const onSubmit = async (data: CreateDocumentFormData) => {
    try {
      await createDocumentMutation.mutateAsync(data);
      reset();
      onSuccess?.();
      Alert.alert('Success', 'Document created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create document');
    }
  };

  return (
    <>
      <Text className="mb-1 text-sm font-semibold">Name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            className="mb-1"
            placeholder="Enter document name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text className="mb-3 text-sm text-red-500">{errors.name.message}</Text>}
      {!errors.name && <View className="mb-3" />}

      <Text className="mb-1 text-sm font-semibold">Version</Text>
      <Controller
        control={control}
        name="version"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            className="mb-1"
            placeholder="e.g., 1.0.0"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.version && (
        <Text className="mb-3 text-sm text-red-500">{errors.version.message}</Text>
      )}
      {!errors.version && <View className="mb-3" />}

      <Text className="mb-1 text-sm font-semibold">File</Text>
      <View className="mb-1 flex-row">
        <Button variant="outline" className="bg-white" onPress={pickFile}>
          <Text className="font-semibold text-blue-500">
            {selectedFile ? selectedFile.name : 'Choose File'}
          </Text>
        </Button>
      </View>
      {errors.file && <Text className="mb-3 text-sm text-red-500">{errors.file.message}</Text>}
      {!errors.file && <View className="mb-3" />}

      <View className="mt-auto flex-row gap-3">
        <Button
          className={`flex-1 ${isValid ? 'bg-blue-500' : 'bg-gray-400'}`}
          disabled={!isValid || createDocumentMutation.isPending}
          onPress={handleSubmit(onSubmit)}>
          <Text className="font-semibold">
            {createDocumentMutation.isPending ? 'Creating...' : 'Submit'}
          </Text>
        </Button>
      </View>
      {/* <Text className="mb-1 text-sm font-semibold">Name</Text>
      <Input className="mb-3" placeholder="name" />
      <Text className="mb-1 text-sm font-semibold">Version</Text>
      <Input className="mb-3" placeholder="version" />
      <Text className="mb-1 text-sm font-semibold">File</Text>
      <View className="flex-row">
        <Button variant="outline" className="bg-white">
          <Text className="font-semibold text-blue-500">Choose File</Text>
        </Button>
      </View>
      <View className="mt-auto flex-row gap-3">
        <Button className="flex-1 bg-blue-500">
          <Text className="font-semibold">Submit</Text>
        </Button>
      </View> */}
    </>
  );
}
