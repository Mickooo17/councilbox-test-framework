import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { TagData } from '../../pages/templates/TagsPage';

f.test.describe('Templates - Tags Tests', () => {
    let tagData: TagData;

    f.test.beforeEach(async ({ loginPage, homePage, tagsPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
        await homePage.validateHomePageIsOpened();
        await tagsPage.dismissModal();
        await tagsPage.selectQADevCompany();
        await tagsPage.page.waitForLoadState('networkidle');
        await tagsPage.navigateToTemplates();
        await tagsPage.navigateToTagsTab();
    });

    f.test.afterEach(async ({ tagsPage }) => {
        if (tagData?.key) {
            await tagsPage.deleteTag(tagData.key);
            await tagsPage.verifyDeleteSuccessAlert();
        }
    });

    f.test('should create a new tag and verify it appears in the list @smoke @regression', async ({ tagsPage }) => {
        tagData = DataGenerator.randomTagData();
        await tagsPage.createTag(tagData);
        await tagsPage.searchTag(tagData.key);
        await tagsPage.verifyTagInTable(tagData.key);
    });
});
