<template>
  <a-card hoverable class="application-card">
    <template #actions>
      <span class="icon-hover" titile="编辑"> <icon-edit /></span>
      <a-dropdown position="bottom" @select="handleSelect">
        <span class="icon-hover" @click.stop="() => false"> <IconMore /> </span>
        <template #content>
          <a-doption value="copy" @click.stop="() => false">复制</a-doption>
          <a-doption value="del" @click.stop="() => false">删除</a-doption>
        </template>
      </a-dropdown>
    </template>
    <template #cover>
      <div :data-icon="item.icon" class="app-icon__cover">
        <img
          :style="{ width: '60px', height: '60px' }"
          alt="dessert"
          :src="item.icon"
        />
      </div>
      <div
        :style="{
          backgroundImage: `url(${item.icon})`,
        }"
        class="app-card__cover-bg"
      ></div>
    </template>
    <a-card-meta :title="item.name" :description="item.describe">
      <template #avatar>
        <div
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
        >
          <a-space>
            <a-tag v-for="(tag, index) in item.tags" :key="index" color="gray">
              <template #icon>
                <icon-codepen />
              </template>
              {{ tag }}
            </a-tag>
          </a-space>
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup lang="ts" name="application-card">
  import { AppModel } from '../application-list-page.vue';

  const props = defineProps<{
    item: AppModel;
  }>();
  const emit = defineEmits<{
    (e: 'copy', id: string): void;
    (e: 'del', id: string): void;
  }>();
  function handleSelect(type: any) {
    // eslint-disable-next-line no-underscore-dangle
    emit(type, props.item._id);
  }
</script>

<style lang="less">
  .application-card {
    height: 100%;
    cursor: pointer;

    .icon-hover {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      transition: all 0.1s;
    }

    .icon-hover:hover {
      background-color: rgb(var(--gray-2));
    }

    .arco-card-cover {
      position: relative;
    }

    .app-card__cover-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      filter: blur(15px);
    }

    .app-icon__cover {
      position: relative;
      z-index: 99;
      display: flex;
      align-items: center;
      height: 100px;
      padding: 12px 16px;
      // background-color: rgb(var(--arcoblue-5), 0.6);
      img {
        margin-right: 10px;
      }
    }

    .arco-card-meta-description {
      margin-top: 8px;
    }

    .arco-card-meta-title {
      line-height: 24px;
    }

    .icon-hover {
      cursor: pointer;
    }

    .arco-card-body {
      padding: 12px 16px;
    }
  }
</style>
