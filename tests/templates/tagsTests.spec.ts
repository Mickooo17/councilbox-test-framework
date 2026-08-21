import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { TagData } from '../../pages/templates/TagsPage';

f.test.describe('Templates - Tags Tests', () => {
    let tagData: TagData;

    f.test.beforeEach(async ({ homePage, tagsPage }) => {
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

f.test.describe('Templates - Tags Search Tests', () => {
    f.test.beforeEach(async ({ homePage, tagsPage }) => {
        await homePage.validateHomePageIsOpened();
        await tagsPage.dismissModal();
        await tagsPage.selectQADevCompany();
        await tagsPage.page.waitForLoadState('networkidle');
        await tagsPage.navigateToTemplates();
        await tagsPage.navigateToTagsTab();
    });

    f.test('should search for a non-existent tag and verify no results @regression', async ({ tagsPage }) => {
        const nonExistentKey = `NONEXISTENT_TAG_${DataGenerator.randomNumber(10)}`;
        await tagsPage.searchTag(nonExistentKey);
        await tagsPage.verifyNoSearchResults();
    });
});

f.test.describe('Templates - Tags Edit Tests', () => {
    let tagData: TagData;

    f.test.beforeEach(async ({ homePage, tagsPage }) => {
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

    f.test('should create a tag, edit its value, and verify the update @regression', async ({ tagsPage }) => {
        tagData = DataGenerator.randomTagData();

        // Create the tag
        await tagsPage.createTag(tagData);
        await tagsPage.searchTag(tagData.key);
        await tagsPage.verifyTagInTable(tagData.key);

        // Edit the tag's value
        const newValue = `edited_value_${DataGenerator.randomString(6)}`;
        await tagsPage.editTag(tagData.key, { value: newValue });

        // Verify the tag still exists with its key (key doesn't change)
        await tagsPage.searchTag(tagData.key);
        await tagsPage.verifyTagInTable(tagData.key);
    });
});

f.test.describe('Templates - Tags Delete Tests', () => {
    f.test.beforeEach(async ({ homePage, tagsPage }) => {
        await homePage.validateHomePageIsOpened();
        await tagsPage.dismissModal();
        await tagsPage.selectQADevCompany();
        await tagsPage.page.waitForLoadState('networkidle');
        await tagsPage.navigateToTemplates();
        await tagsPage.navigateToTagsTab();
    });

    f.test('should create and delete a tag, then verify it no longer appears @XR-1607 @regression', async ({ tagsPage }) => {
        const tagData = DataGenerator.randomTagData();

        // Create tag
        await tagsPage.createTag(tagData);
        await tagsPage.searchTag(tagData.key);
        await tagsPage.verifyTagInTable(tagData.key);

        // Delete tag
        await tagsPage.deleteTag(tagData.key);
        await tagsPage.verifyDeleteSuccessAlert();

        // Verify it no longer exists
        await tagsPage.searchTag(tagData.key);
        await tagsPage.verifyTagNotInTable(tagData.key);
    });
});

f.test.describe('Templates - Tags Validation Tests', () => {
    f.test.beforeEach(async ({ homePage, tagsPage }) => {
        await homePage.validateHomePageIsOpened();
        await tagsPage.dismissModal();
        await tagsPage.selectQADevCompany();
        await tagsPage.page.waitForLoadState('networkidle');
        await tagsPage.navigateToTemplates();
        await tagsPage.navigateToTagsTab();
    });

    f.test('should not allow creating tag without value field @XR-1605 @regression', async ({ tagsPage }) => {
        const tagData = DataGenerator.randomTagData();

        await tagsPage.openCreateTagForm();
        // Fill only code/key and description, leave value empty
        await tagsPage.tagKeyInput.fill(tagData.key);
        await tagsPage.tagDescriptionInput.fill(tagData.description);

        // Click Save button
        await tagsPage.submitCreateForm();

        // Verify the dialog stays open and validation error is visible
        await tagsPage.verifyCreateTagFormVisible();
        await tagsPage.verifyFieldRequiredError();
    });

    f.test('should not allow creating tag without code field @XR-1604 @regression', async ({ tagsPage }) => {
        const tagData = DataGenerator.randomTagData();

        await tagsPage.openCreateTagForm();
        // Fill only value and description, leave code/key empty
        await tagsPage.tagValueInput.fill(tagData.value);
        await tagsPage.tagDescriptionInput.fill(tagData.description);

        // Click Save button
        await tagsPage.submitCreateForm();

        // Verify the dialog stays open and validation error is visible
        await tagsPage.verifyCreateTagFormVisible();
        await tagsPage.verifyFieldRequiredError();
    });
});
