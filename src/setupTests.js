import Enzyme, { EnzymeAdapter } from 'enzyme';
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({ adapter: new EnzymeAdapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));