/*
 * Knowage, Open Source Business Intelligence suite
 * Copyright (C) 2016 Engineering Ingegneria Informatica S.p.A.
 *
 * Knowage is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Knowage is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package it.eng.spagobi.engines.whatif.template.initializer.impl;

import org.apache.log4j.Logger;

import it.eng.spago.base.SourceBean;
import it.eng.spagobi.engines.whatif.template.WhatIfTemplate;
import it.eng.spagobi.engines.whatif.template.initializer.AbstractInitializer;

/**
 * @author Dragan Pirkovic
 *
 */
public class MondrianMdxQueryInitializerImpl extends AbstractInitializer {

	public static transient Logger logger = Logger.getLogger(MondrianMdxQueryInitializerImpl.class);

	public static final String TAG_MDX_MONDRIAN_QUERY = "MDXMondrianQuery";

	@Override
	public void init(SourceBean template, WhatIfTemplate toReturn) {
		SourceBean mdxMondrianSB = (SourceBean) template.getAttribute(TAG_MDX_MONDRIAN_QUERY);
		logger.debug(TAG_MDX_MONDRIAN_QUERY + ": " + mdxMondrianSB);
		String mdxMondrianQuery = mdxMondrianSB.getCharacters();
		toReturn.setMondrianMdxQuery(mdxMondrianQuery);
	}

}
