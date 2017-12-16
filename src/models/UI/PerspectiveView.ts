
import * as rev from 'rev-models';
import { ApiOperations } from 'rev-api';
import { View } from './View';
import { Perspective } from './Perspective';
import { RevCRMModel } from '../RevCRMModel';

@ApiOperations(['read'])
export class PerspectiveView extends RevCRMModel<PerspectiveView> {

    @rev.AutoNumberField({ primaryKey: true })
        id: number;
    @rev.RecordField({ model: 'Perspective' })
        perspective: Perspective;
    @rev.RecordField({ model: 'View' })
        view: View;

}
