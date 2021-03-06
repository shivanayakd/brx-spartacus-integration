/*
 * Copyright 2020 Hippo B.V. (http://www.onehippo.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

interface DocumentModels {
  document?: import('@bloomreach/spa-sdk').Reference;
}

interface DocumentData {
  author: string;
  content: DocumentContent;
  date: number;
  publicationDate: number;
  image: import('@bloomreach/spa-sdk').Reference;
  introduction: string;
  title: string;

  [property: string]: any;
}

interface DocumentContent {
  value: string;
}

interface BannerCompound {
  title?: string;
  content?: DocumentContent;
  image?: import('@bloomreach/spa-sdk').Reference;
  cta?: string;
  link?: import('@bloomreach/spa-sdk').Reference;
}

interface ProductListParams {
  pagesize: number;
  infinitescrollActive: boolean;
  infinitescrollLimit?: number;
  infinitescrollMore?: boolean;
}

interface SearchBoxParams {
  maxSuggestions?: number;
  maxProducts?: number;
  displaySuggestions?: boolean;
  displayProducts?: boolean;
  displayProductImages?: boolean;
  minCharactersBeforeRequest?: number;
}
