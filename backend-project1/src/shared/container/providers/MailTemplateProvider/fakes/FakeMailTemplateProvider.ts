import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../model/IMailTemplateProvider';

class FakeMailTempalteProvider implements IMailTemplateProvider {
    public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
        return template;
    }
}

export default FakeMailTempalteProvider;
