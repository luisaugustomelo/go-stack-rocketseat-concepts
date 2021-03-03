import IMailTemplateProvider from '../model/IMailTemplateProvider';

class FakeMailTempalteProvider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail content';
    }
}

export default FakeMailTempalteProvider;
