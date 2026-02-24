import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContactFormProps {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    processing: boolean;
    submitLabel: string;
    onSubmit: (e: React.FormEvent) => void;
    onCepBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function ContactForm({ data, setData, errors, processing, submitLabel, onSubmit, onCepBlur }: ContactFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4 bg-black p-6 rounded-xl shadow-sm border border-neutral-200">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" value={data.cpf} onChange={e => setData('cpf', e.target.value)} />
                    {errors.cpf && <span className="text-red-500 text-sm">{errors.cpf}</span>}
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                            <Label htmlFor="cep">CEP</Label>
                            <Input 
                                id="cep" 
                                value={data.cep} 
                                onChange={e => setData('cep', e.target.value)}
                                onBlur={onCepBlur}
                                maxLength={9}
                                placeholder="00000-000"
                            />
                        </div>
                <div className="col-span-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={data.city} onChange={e => setData('city', e.target.value)} />
                </div>
            </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <Label htmlFor="neighbourhood">Neighbourhood</Label>
                        <Input id="neighbourhood" value={data.neighbourhood} onChange={e => setData('neighbourhood', e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <Label htmlFor="street">Street</Label>
                        <Input id="street" value={data.street} onChange={e => setData('street', e.target.value)} />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="number">Number</Label>
                        <Input id="number" value={data.number} onChange={e => setData('number', e.target.value)} />
                    </div>
                </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
                <Button type="submit" disabled={processing}>{submitLabel}</Button>
            </div>
        </form>
    );
}